gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();




function Startanimation() {
    locoScroll.stop()
    let clutter = ``;
    let h1array = document.querySelector('.animate-h1').textContent.split('')
    h1array.forEach(function (e) {
        clutter += `<span class="inline-block">${e}</span>`
    })
    document.querySelector('.animate-h1').innerHTML = clutter

    for (let i = 0; i < h1array.length / 2; i++) {
        gsap.from(`span:nth-child(${i + 1}) , span:nth-child(${h1array.length - i})`, {
            opacity: 0,
            y: 50,
            delay: 0.1 * i
        })
    }

    let tm = gsap.timeline()
    tm.to('.div1', {
        scale: 1,
    })
        .to('.div1 img:nth-child(1)', {
            opacity: 0,
            duration: .2,

        })
        .to('.div1', {
            height: '45vh',
            width: '32vw',
            backgroundColor: 'seagreen'
        }, 'a')
        .to('.div1 img:nth-child(2)', {
            duration: .5,
            opacity: 1,


        }, 'a')
        .to('.div1 img:nth-child(2)', {
            opacity: 0,

        })
        .to('.div1', {
            width: '19.5vw',
            height: '50vh',
            backgroundColor: '#d09c00',
            oncomplete: () => {
                for (let i = 0; i < h1array.length / 2; i++) {
                    gsap.to(`span:nth-child(${i + 1}) , span:nth-child(${h1array.length - i})`, {
                        opacity: 0,
                        y: -50,
                        delay: 0.1 * i
                    })
                }
            }
        }, 'b')
        .to('.div1 img:nth-child(3)', {
            duration: .5,
            opacity: 1,
        }, 'b')
        .to('.div1 img:nth-child(3)', {
            opacity: 0,
        }, 'c')
        .to('.div1 img:nth-child(4)', {
            opacity: 1,
        }, 'd')
        .to('.div1', {
            width: '100vw',
            height: '100vh',
            opacity: .9,
            oncomplete: () => {
                setTimeout(() => {
                    document.querySelector('body').removeChild(document.querySelector('.loading'))
                    split(1);
                    split(2);
                }, 700)
            }
        }, 'd').then(function(){
            locoScroll.start();
        })

}

Startanimation();
function split(num) {
    let clutter = ``;
    let h1array = document.querySelector(`.page1 h1:nth-child(${num})`).textContent.split('')
    h1array.forEach(function (e) {
        if (e === ` `) {
            clutter += `<span class="inline-block mr-[3vw]">${e}</span>`
        } else {
            clutter += `<span class="inline-block">${e}</span>`

        }
    })
    document.querySelector(`.page1 h1:nth-child(${num}`).innerHTML = clutter
    for(let i = 0 ; i<=h1array.length ; i++){
        gsap.from(`.page1 h1:nth-child(${num}) span:nth-child(${num === 1 ? i : h1array.length -i})`, {
            opacity:0,
            y: 50,
            delay: 0.1 * i
        })
    }
}



gsap.to('.page1 .pageText', {
    top: '100%',
    duration: 1,
    scrollTrigger: {
        scroller: ".main",
        trigger: '.page1',
        start: '40% 30%',
        end: '100% 0%',
        scrub: .15,

    }
});
gsap.to('.page2 .pageText', {
    top: '100%',
    duration: 5,
    scrollTrigger: {
        scroller: ".main",
        trigger: '.page2',
        start: '-40% 30%',
        end: '180% 0%',
        scrub: .15,

    }
});
gsap.to('.page3 .pageText', {
    top: '100%',
    duration: 5,
    scrollTrigger: {
        scroller: ".main",
        trigger: '.page3',
        start: '-20% 30%',
        end: '180% 0%',
        scrub: .15,

    }
});
gsap.to('.page4 .pageText', {
    top: '130%',
    duration: 5,
    scrollTrigger: {
        scroller: ".main",
        trigger: '.page4',
        start: '-10% 30%',
        end: '180% 0%',
        scrub: .15,

    }
});
gsap.to('.page5 .pageText', {
    top: '100%',
    duration: 5,
    scrollTrigger: {
        scroller: ".main",
        trigger: '.page5',
        start: '-30% 30%',
        end: '180% 0%',
        scrub: .15,

    }
});
gsap.to('.page6 .pageText', {
    top: '50%',
    scrollTrigger: {
        scroller: ".main",
        trigger: '.page6',
        start: '-50% 30%',
        end: '90% 0%',
        scrub: .15,
    }
});


document.querySelectorAll('.list1').forEach(function(el) {
    el.addEventListener('mouseenter', function(dets){
        this.querySelector('.overlay').style.transformOrigin =this.clientHeight - dets.offsetY > this.clientHeight/2 ?'top' : 'bottom';
    })
})