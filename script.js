console.log('Hello World!')
/* var list = document.querySelectorAll("ul.nav.nav-stacked") */
let queue = 0,
    time = ['8:30', '10:00', '11:30', '13:30'],
    month = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'],
    uls = document.querySelectorAll('ul.nav.nav-stacked')
//document.querySelector('ul.nav.nav-stacked li.list-group-item').firstChild
function main(){
    uls = document.querySelectorAll('ul.nav.nav-stacked')
    for(let ul of uls){
        for(let li_element of ul.querySelectorAll('li.list-group-item')){
            let li_childs = li_element.children,
            li_text = li_element.innerText,
            text = ''
            let array = []
            // console.log(li_element.innerText)
            for(let i of li_text){
                if(i == '\n')break
                text += i;
            }
            queue ++;
            if(text[0] < queue) queue = 1
            // console.log(queue, text[0]);
        if(queue != text[0]){  missed_lesson(queue, li_element); queue++ /*1+new Number(text[0])*/ }
            // for(let k = 0; k < li_childs.length; k++){
            //     // if(li_childs[k].childNodes.length == 0)continue
            //     console.log(li_childs[k].innerText)
            //     // let text = li_childs[k].childNodes[0]
            //     // array[text[1]] = text
            //     // console.log(k, text);
            // }
            // console.log(text)
        }
    }
}
// qolib ketgan parani ko'rsatish
function missed_lesson(queue, element){
    let ul = document.createElement("ul")//element.parentElement
    let new_li = document.createElement('li'),
    br = document.createElement('br'),
    span = document.createElement("span"),
    time_span = document.createElement('span')

    new_li.classList.add('list-group-item')
    span.classList.add("text-center", "text-muted")
    time_span.classList.add("pull-right", "text-muted")
    new_li.textContent = `${queue}. Dars yo'q`
    span.textContent = "Istalgan joy"
    time_span.textContent = time[queue - 1]

    new_li.appendChild(br)
    new_li.appendChild(span)
    new_li.appendChild(time_span)
    element.parentElement.insertBefore(new_li, element)

    // console.log(element);
    // console.error(`We missed ${queue} lesson`);
}
function lesson_at_the_time(){
    let lists = document.querySelectorAll("li.list-group-item")
    let date = new Date()
    // bugungi kun
    let date_to_check = `${date.getDate()} ${month[date.getMonth()]}, ${1900+date.getYear()}`
    // ro'yxatni aylanish
    for(let ul of document.querySelectorAll('ul.nav.nav-stacked')){
        let div = ul.parentElement //div-body
            .parentElement, //div
            header = div.children[0],
            // bizga kerak bo'lgan hafta kuni
            time = header.querySelector('h3 span.pull-right').textContent
            if(time.trim() == date_to_check){
                for(let i of ul.children){
                    let raw_time = new Array(...i.children).reverse()[0].textContent,
                        minutes = raw_time.split(':')[0]*60+parseInt(raw_time.split(':')[1]), // 11:30 = 690
                        minutes_at_the_moment = date.getHours()*60+date.getMinutes()//710 // 12:00 = 720
                        if(minutes_at_the_moment < minutes + 90 && minutes < minutes_at_the_moment){
                            document.createElement('li')
                            i.style.backgroundColor = 'lightgreen'
                            // console.log(minutes_at_the_moment - 90, minutes_at_the_moment, minutes, i);
                        }
                }
            }
            // console.log(time.trim(), time.trim() == date_to_check, date_to_check);
    }
}
// window.onchange = main
window.onload = main
window.onchange = main

// setTimeout(lesson_at_the_time, 1000)
setInterval(lesson_at_the_time, 1000)

// new Array(...document.getElementsByClassName("row sh-parent")).forEach(e => e.onchange = main)
// document.querySelector('body').addEventListener('change', main)
// // document.querySelector('input.select2-search__field').onchange = main
// window.onclick = e => {
//     console.log(ul);
//     setTimeout(() => {
//         if(!document.contains(ul)) main()
//     }, 100);
// }
// self.addEventListener('fetch', event => {
//         console.log(event.request)
//         event.respondWith(fetch(event.request));
// })