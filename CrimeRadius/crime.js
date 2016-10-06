$.ajax({
    url: "https://data.seattle.gov/resource/pu5n-trf4.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "YOURAPPTOKENHERE"
    }
}).done(data) {
  alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);
});
