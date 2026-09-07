/**
 * PhysioLife - Chart.js Visualizations & Dark/Light Mode Adaptability
 * Author: Antigravity
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  if (typeof Chart === 'undefined') return;

  function isDarkMode() {
    return document.documentElement.getAttribute('data-bs-theme') === 'dark';
  }

  function getChartColors() {
    const dark = isDarkMode();
    return {
      textColor: dark ? '#94A3B8' : '#64748B',
      gridColor: dark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
      primary: '#0F766E',
      primaryLight: '#14B8A6',
      secondary: '#F97316',
      accent: '#0EA5E9',
      surface: dark ? '#1E293B' : '#FFFFFF'
    };
  }

  /* ==========================================================================
     Patient Dashboard: Recovery Progress Doughnut Chart
     ========================================================================== */
  const patientRecoveryCanvas = document.getElementById('patientRecoveryChart');
  let patientRecoveryChartInstance = null;

  if (patientRecoveryCanvas) {
    const colors = getChartColors();
    patientRecoveryChartInstance = new Chart(patientRecoveryCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Completed Goals', 'Remaining Milestones'],
        datasets: [
          {
            data: [78, 22],
            backgroundColor: [colors.primaryLight, colors.gridColor],
            borderWidth: 0,
            hoverOffset: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: colors.textColor, font: { family: 'Plus Jakarta Sans', weight: 600 } }
          }
        }
      }
    });
  }

  /* ==========================================================================
     Patient Dashboard: Mobility Improvement Line Chart
     ========================================================================== */
  const patientMobilityCanvas = document.getElementById('patientMobilityChart');
  let patientMobilityChartInstance = null;

  if (patientMobilityCanvas) {
    const colors = getChartColors();
    patientMobilityChartInstance = new Chart(patientMobilityCanvas, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [
          {
            label: 'Range of Motion (Degrees)',
            data: [45, 60, 75, 90, 110, 130],
            borderColor: colors.primaryLight,
            backgroundColor: 'rgba(20, 184, 166, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { color: colors.gridColor },
            ticks: { color: colors.textColor }
          },
          y: {
            grid: { color: colors.gridColor },
            ticks: { color: colors.textColor }
          }
        },
        plugins: {
          legend: {
            labels: { color: colors.textColor }
          }
        }
      }
    });
  }

  /* ==========================================================================
     Admin Dashboard: Monthly Revenue & Target Chart
     ========================================================================== */
  const adminRevenueCanvas = document.getElementById('adminRevenueChart');
  let adminRevenueChartInstance = null;

  if (adminRevenueCanvas) {
    const colors = getChartColors();
    adminRevenueChartInstance = new Chart(adminRevenueCanvas, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Revenue ($)',
            data: [32000, 36500, 41200, 39800, 45600, 48920, 47200, 52000, 54500, 58000, 61200, 64500],
            backgroundColor: colors.primary,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: colors.textColor }
          },
          y: {
            grid: { color: colors.gridColor },
            ticks: {
              color: colors.textColor,
              callback: (val) => '$' + val.toLocaleString()
            }
          }
        },
        plugins: {
          legend: { labels: { color: colors.textColor } }
        }
      }
    });
  }

  /* ==========================================================================
     Admin Dashboard: Patient Category Breakdown Doughnut
     ========================================================================== */
  const adminCategoryCanvas = document.getElementById('adminCategoryChart');
  let adminCategoryChartInstance = null;

  if (adminCategoryCanvas) {
    const colors = getChartColors();
    adminCategoryChartInstance = new Chart(adminCategoryCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Sports Rehab', 'Spine & Back', 'Post-Surgery', 'Neurological', 'Joint & Arthritis'],
        datasets: [
          {
            data: [35, 25, 20, 12, 8],
            backgroundColor: ['#0F766E', '#14B8A6', '#F97316', '#0EA5E9', '#8B5CF6'],
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: colors.textColor }
          }
        }
      }
    });
  }

  // Listen for dynamic theme switch and update chart instances
  window.addEventListener('themeChanged', function () {
    const newColors = getChartColors();

    const chartInstances = [
      patientRecoveryChartInstance,
      patientMobilityChartInstance,
      adminRevenueChartInstance,
      adminCategoryChartInstance
    ];

    chartInstances.forEach((inst) => {
      if (!inst) return;
      if (inst.options.plugins?.legend?.labels) {
        inst.options.plugins.legend.labels.color = newColors.textColor;
      }
      if (inst.options.scales?.x) {
        inst.options.scales.x.ticks.color = newColors.textColor;
        inst.options.scales.x.grid.color = newColors.gridColor;
      }
      if (inst.options.scales?.y) {
        inst.options.scales.y.ticks.color = newColors.textColor;
        inst.options.scales.y.grid.color = newColors.gridColor;
      }
      inst.update();
    });
  });
});
