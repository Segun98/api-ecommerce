const cluster = require('cluster');
const os = require('os');
// const runExpressServer = require('./app');

// Check if current process is master.
if (cluster.isMaster) {
    // Get total CPU cores.
    const cpuCount = os.cpus().length;

    console.log(`Taking advantage of ${cpuCount} CPUs`)

    // Spawn a worker for every core.
    for (let j = 0; j < cpuCount; j++) {
        cluster.fork();
    }
    // set console's directory so we can see output from workers
    console.dir(cluster.workers, {
        depth: 0
    });

    // initialize our CLI 
    process.stdin.on('data', (data) => {
        initControlCommands(data);
    })

    console.log(`Master PID: ${process.pid}`)

} else {
    // This is not the master process, so we spawn the express server.
    //   runExpressServer();
    require("../index")
}

// Cluster API has a variety of events.
// Here we are creating a new process if a worker die.
cluster.on('exit', function (worker) {
    console.log(`Worker ${worker.id} died'`);
    console.log(`Staring a new one...`);
    cluster.fork();
});