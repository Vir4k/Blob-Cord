module.exports = client => {
  console.log(`${client.user.username} is now ready to be online.`)

  function randomStatus() {
    let status = [`/help`]
    let rstatus = Math.floor(Math.random() * status.length);
      
    client.user.setActivity(status[rstatus], {type: "LISTENING"});
  }
  setInterval(randomStatus, 30000);
}