function display() {
    const algorithm = document.getElementById("algorithm").value;
    const requestInput = document.getElementById("requests").value;
    const maxDiskSize = parseInt(document.getElementById("maxDiskSize").value);
    const headStart = parseInt(document.getElementById("headStart").value);
    if(maxDiskSize>199){
        document.getElementById('results').innerHTML="MAX DISK SIZE IS 199!"
        return;
    }
    if (algorithm === "select" || requestInput.trim() === "") {
      alert("Please select an algorithm and enter disk requests.");
      return;
    }
  
    let requests = requestInput.split(",").map(Number).filter(n => !isNaN(n));
    let max = Math.max(...requests);
    let min = Math.min(...requests);
    if(max>maxDiskSize || min<0)
    {
        document.getElementById('results').innerHTML="ENTER THE VALUE IN RANGE FROM 0 TO MAX-DISK"
        return;
    }
    let sequence = [];
  
    switch (algorithm) {
      case "fcfs":
        sequence = [headStart, ...requests];
        break;
  
      case "sstf":
        sequence = sstf([...requests], headStart);
        break;
  
      case "scan":
        sequence = scan([...requests], headStart, maxDiskSize);
        break;
  
      case "cscan":
        sequence = cscan([...requests], headStart, maxDiskSize);
        break;
  
      case "look":
        sequence = look([...requests], headStart);
        break;
  
      case "clook":
        sequence = clook([...requests], headStart);
        break;
    }
    
      let seekTime = 0;
      for (let i = 1; i < sequence.length; i++) {
        seekTime += Math.abs(sequence[i] - sequence[i - 1]);
      }

  document.getElementById('results').innerHTML = `Seek Sequence: ${sequence.join(" → ")}<br>Total Seek Time: <strong>${seekTime}</strong> cylinders`;

  
    visualize(sequence, maxDiskSize);
  }
  
 
  function sstf(requests, head) {
    const sequence = [head];
    while (requests.length > 0) {
      let closest = requests.reduce((a, b) => Math.abs(a - head) < Math.abs(b - head) ? a : b);
      sequence.push(closest);
      head = closest;
      requests.splice(requests.indexOf(closest), 1);
    }
    return sequence;
  }
  
  function scan(requests, head, max) {
    const sequence = [head];
    const left = requests.filter(r => r < head).sort((a, b) => b - a);
    const right = requests.filter(r => r >= head).sort((a, b) => a - b);
    sequence.push(...right, max, ...left);
    return sequence;
  }
  
  function cscan(requests, head, max) {
    const sequence = [head];
    const left = requests.filter(r => r < head).sort((a, b) => a - b);
    const right = requests.filter(r => r >= head).sort((a, b) => a - b);
    sequence.push(...right, max, 0, ...left);
    return sequence;
  }
  
  function look(requests, head) {
    const sequence = [head];
    const left = requests.filter(r => r < head).sort((a, b) => b - a);
    const right = requests.filter(r => r >= head).sort((a, b) => a - b);
    sequence.push(...right, ...left);
    return sequence;
  }
  
  function clook(requests, head) {
    const sequence = [head];
    const left = requests.filter(r => r < head).sort((a, b) => a - b);
    const right = requests.filter(r => r >= head).sort((a, b) => a - b);
    sequence.push(...right, ...left);
    return sequence;
  }
  
 
  
  function visualize(requests, maxDiskSize) {
    const dataPoints = requests.map((r, i) => ({
      x: r,
      y: i + 1,
      markerType: "circle",
      markerColor: "black",
      markerSize: 10,
      indexLabel: r.toString(),
      indexLabelFontColor: "black",
      indexLabelFontSize: 12,
      indexLabelPlacement: "outside"
    }));
  
    const chart = new CanvasJS.Chart("diskCanvasContainer", {
      animationEnabled: true,
      backgroundColor: "#ffffff",
      axisX: {
        title: "Cylinder Number",
        position: "top",
        minimum: 0,
        maximum: maxDiskSize,
        interval: 20,
        labelFontColor: "orange",
        lineColor: "black",
        tickColor: "black",
        gridThickness: 0
      },
      axisY: {
        title: "Order of Access",
        interval: 1,
        labelFontColor: "black",
        lineColor: "black",
        tickColor: "black",
        gridThickness: 0
      },
      data: [{
        type: "line",
        color: "black",
        lineThickness: 2,
        dataPoints: dataPoints
      }]
    });
  
    chart.render();
  }
  
