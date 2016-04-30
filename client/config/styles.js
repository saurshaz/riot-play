import { browser as Bowser } from 'bowser'
Bowser.isTouch = function () {return Bowser.mobile || Bowser.tablet}
