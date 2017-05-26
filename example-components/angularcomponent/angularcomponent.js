'use strict'

angular.module('')

.component('angularcomponent', {
    templateUrl: 'components/angularcomponent/angularcomponent.html',
    controller: AngularComponent
})

function AngularComponent() {
    // Controller
    console.log('AngularComponent loaded');
}
