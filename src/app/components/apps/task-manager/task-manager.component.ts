import { Component, Output, input, output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss'
})
export class TaskManagerComponent implements OnInit{
  displayTask = true;
  tab = 'PROCESSES';
  chartProccess = null;
  value = [];

  cols = [
    { field: 'Nombre', header: 'Nombre' },
    { field: 'Memoria', header: 'Memoria' },
    { field: 'CPU', header: 'CPU' },
    { field: 'GPU', header: 'GPU' },
    { field: 'Disco', header: 'Disco' }
  ];
  @Output() close = new EventEmitter<Object>();

  closeDialog(){
    this.close.emit()
  }

  ngOnInit(): void {
    this.showGraphic();

    setInterval(() => {
      this.updateSeries();
    }, 3000);
  }

 showGraphic() {
    this.chartProccess = {
      chart: {
        height: 350,
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      series: [
        {
          name: 'CPU',
          data: []
        },
        {
          name: 'GPU',
          data: []
        },
        {
          name: 'DISCO',
          data: []
        },
        {
          name: 'MEMORIA',
          data: []
        }
      ],
      stroke: {
        curve: 'smooth',
        width: 2
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        min: 0,
        max: 100
      },
      title: {
        text: 'Rendimiento',
        align: 'left',
        style: {
          fontSize: '12px'
        }
      },
      legend: {
        show: true,
        floating: false,
        horizontalAlign: 'center',
        position: 'bottom'
      }
    };
  }

  updateSeries() {
    const newTime = new Date().getTime();
    const updatedCPUData = this.chartProccess.series[0].data;
    const updatedGPUData = this.chartProccess.series[1].data;
    const updatedDISKData = this.chartProccess.series[2].data;
    const updatedMEMORIData = this.chartProccess.series[3].data;
    const maxDataPoints = 10; // Define el máximo número de puntos de datos a mostrar

    // Añade nuevos datos
    updatedCPUData.push({ x: newTime, y: Math.floor(Math.random() * 10) + 1 });
    updatedGPUData.push({ x: newTime, y: Math.floor(Math.random() * 50) + 1 });
    updatedDISKData.push({ x: newTime, y: Math.floor(Math.random() * 50) + 1 });
    updatedMEMORIData.push({ x: newTime, y: Math.floor(Math.random() * 50) + 1 });
    // Elimina los puntos de datos más antiguos si se supera el límite
    if (updatedCPUData.length > maxDataPoints) {
      updatedCPUData.shift();
    }
    if (updatedGPUData.length > maxDataPoints) {
      updatedGPUData.shift();
    }
    if (updatedDISKData.length > maxDataPoints) {
      updatedDISKData.shift();
    }
    if (updatedMEMORIData.length > maxDataPoints) {
      updatedMEMORIData.shift();
    }

    this.chartProccess.series = [
      { name: 'CPU', data: updatedCPUData },
      { name: 'GPU', data: updatedGPUData },
      { name: 'DISCO', data: updatedDISKData },
      { name: 'MEMORIA', data: updatedMEMORIData }
    ];

    console.log(this.chartProccess)
  }
}
