module.exports = {
    apps: [
        {
            name: 'client-app',
            script: 'serve dist 5665 --spa',
            instances: 1,
            exec_mode: 'cluster',
            autorestart: true,
            watch: false,
            max_memory_restart: '200M',
        },
    ],
};
