function init() {
    return new Promise((resolve) => {
        console.log('test config');
        process.env.MONGODB_URI = "mongodb://localhost:27017/reiki-test";
        process.env.PORT = 3000;
        process.env.SECRET_KEY = "1a10ba7b58780cf18174a1f648cb35b463345ec1f19e5c703ac4c7fb429122c7"
        return resolve('ok');
    })
}

export {init};