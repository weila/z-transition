$(".pages").zFrameAnimate({
    'action': 'click',
    'perspective': '4000px',
    'perspectiveOrigin': 'top',
    'style': 'preserve-3d',
    'origin': 'center',
    'toggler': '.wawa',
    'reseter': '.bibi',
    'transition':{
        'property': 'all',
        'duration': '0.6s',
        'function': 'linear',
    },
    'css':{
        'width': '80px',
        'opacity': '0'
    },
    'transform':{
        'translateZ': '-18px',
        'rotateX': '90deg'
        }
});
$(".textA").zFrameAnimate({
    'action': 'click',
    'toggler': '.gogo',
    'reseter': '.gigi',
    'css':{
        'background-color': '#f00',
        'border-radius': '100px'
    },
});