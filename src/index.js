/* global  button_3d_data:true */


import viewerTemplate from './3d/MouseControll';
// import viewerTemplate from './3d/AutoRotation';

const viewer= new viewerTemplate;
 viewer.baseUrl=(window.button_3d_data && window.button_3d_data.baseUrl) || '';
viewer.start();