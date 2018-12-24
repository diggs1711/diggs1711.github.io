import './../images/background.png';
import './../images/midground.png';
import './../images/foreground.png';
import './../src/main.css';

var tl = new TimelineMax()
tl.from("#titleText", 1.5, {
        scaleX: 0,
        transformOrigin: 'left',
        ease: Power2.easeOut
    })
    .from('.bio', 0.5, {
        scaleX: 0,
        transformOrigin: "left",
        ease: Power2.easeOut
    })
    .from('#stand', 0.5, {
        scaleY: 0,
        transformOrigin: "bottom",
        ease: Power2.easeOut
    })
    .from('#standBack', 0.5, {
        scaleY: 0,
        transformOrigin: "bottom",
        ease: Power2.easeOut
    })
    .from('#monitorBottom', 0.7, {
        scaleX: 0,
        transformOrigin: 'center',
        ease: Bounce.easeOut
    })
    .from('#screen', 0.6, {
        scaleY: 0,
        transformOrigin: "bottom",
        ease: Circ.easeOut,
        delay: 0.4
    })
    .from('#yellowBox', 0.5, {
        scale: 0
    })
    .staggerFrom('#Layer_1 > g:nth-child(1) > g path', 0.2, {
        scaleX: 0
    }, -0.1)