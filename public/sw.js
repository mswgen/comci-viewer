importScripts('/localforage.min.js');

const CACHE_NAME = 'cache-v17';

self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => {
                        return caches.open(cacheName).then(cache => {
                            return cache.keys().then(keys => {
                                return Promise.all(
                                    keys.map(request => {
                                        if (request.url.includes('/api/getTimetable') || request.url.includes('/api/getTeacherTimetable')) {
                                            return caches.open(CACHE_NAME).then(async newCache => {
                                                return newCache.put(request, (await cache.match(request)).clone()).then(() => {
                                                    return cache.delete(request);
                                                });
                                            });
                                        } else return cache.delete(request);
                                    })
                                ).finally(() => {
                                    return caches.delete(cacheName)
                                });
                            });
                        });
                    })
            );
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll([
                '/back.svg',
                '/close.svg',
                '/offline.svg',
                '/remove.svg',
                '/settings.svg',
                '/notification.svg',
                '/notification-off.svg',
                '/share.svg',
                '/localforage.min.js',
                '/',
                '/add',
                '/manage'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        event.request.url.includes('/api') ?
            (
                (event.request.url.includes('/api/getTimetable') || event.request.url.includes('/api/getTeacherTimetable')) ? (
                    fetch(event.request)
                        .then(response => {
                            return caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, response.clone());
                                return response;
                            });
                        })
                        .catch(() => {
                            return caches.open(CACHE_NAME).then(cache => {
                                return cache.match(event.request).then(response => {
                                    const newHeaders = new Headers(response.headers);
                                    newHeaders.append('X-Is-Cache', 'true');
                                    return new Response(response.body, {
                                        status: response.status,
                                        statusText: response.statusText,
                                        headers: newHeaders
                                    });
                                }).catch(() => {
                                    return fetch(event.request);
                                })
                            });
                        })
                ) : fetch(event.request)
            )
            : caches.open(CACHE_NAME).then(async cache => {
                const response = await cache.match(event.request);
                return (
                    response ||
                    fetch(event.request).then(response_1 => {
                        cache.put(event.request, response_1.clone());
                        return response_1;
                    })
                );
            })
    );
});

self.addEventListener('periodicsync', event => {
    if (!event.tag.startsWith('timetable-')) return;
    event.waitUntil(
        fetch(`/api/getTimetable?code=${event.tag.split('-')[1]}&grade=${parseInt(event.tag.split('-')[2]) + 1}&classNum=${parseInt(event.tag.split('-')[3]) + 1}`).then(async response => {
            if (!response.ok) return;
            const resClone = response.clone();
            const data = await response.json();
            if (!data) return;
            const prevData = await (await caches.open(CACHE_NAME)).match(`/api/getTimetable?code=${event.tag.split('-')[1]}&grade=${parseInt(event.tag.split('-')[2]) + 1}&classNum=${parseInt(event.tag.split('-')[3]) + 1}`);
            if (prevData && (await prevData.json()).data.lastUpdated === data.data.lastUpdated) return;
            const cache = await caches.open(CACHE_NAME);
            await cache.put(`/api/getTimetable?code=${event.tag.split('-')[1]}&grade=${parseInt(event.tag.split('-')[2]) + 1}&classNum=${parseInt(event.tag.split('-')[3]) + 1}`, resClone);
            if (Notification.permission !== 'granted') return;
            localforage.config({
                version: 2
            });
            const isNotificationEnabled = (await localforage.getItem('notification') || []);
            if (isNotificationEnabled.some(n => n.code === parseInt(event.tag.split('-')[1]) && n.grade === parseInt(event.tag.split('-')[2]) && n.classNum === parseInt(event.tag.split('-')[3]))) {
                self.registration.showNotification(`${(await localforage.getItem('addedClasses')).find(x => x.school.code === parseInt(event.tag.split('-')[1]) && x.grade === parseInt(event.tag.split('-')[2]) && x.classNum == parseInt(event.tag.split('-')[3])).school.name} 시간표 변경`, {
                    body: '알림을 눌러 변경된 시간표를 확인하세요.',
                    icon: '/icon1.png',
                    tag: '시간표 변경',
                    data: {
                        code: parseInt(event.tag.split('-')[1]),
                        grade: parseInt(event.tag.split('-')[2]),
                        classNum: parseInt(event.tag.split('-')[3])
                    }
                });
            }
        })
    );
});

self.addEventListener('notificationclick', async event => {
    event.notification.close();
    event.waitUntil((async () => {
        localforage.config({
            version: 2
        });
        if (event.notification.tag !== '시간표 변경') return;
        const addedClasses = await localforage.getItem('addedClasses');
        await localforage.setItem('classSelection', addedClasses.map(x => `${x.school.code}-${x.grade}-${x.classNum}`).indexOf(`${event.notification.data.code}-${event.notification.data.grade}-${event.notification.data.classNum}`));
        return clients.openWindow('/');
    })());
});
