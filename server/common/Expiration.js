const GetExpiration = (hour) => {
    const today = new Date();
    today.setHours(today.getHours() + hour);
    return Math.floor(today.getTime() / 1000);
}

module.exports = GetExpiration;

