import figlet from "figlet";

figlet("Hello World!! I'm using the command line art", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});
