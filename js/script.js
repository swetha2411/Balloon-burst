let colours=['red','yellow','violet','green','blue'];
let windowheight=window.innerHeight;
let windowwidth=window.innerWidth;
let body=document.body;
let score=document.querySelectorAll('.score');
let num=0;
let total=100;
let currentballoon=0;
let gameover=false;
let totalshadow=document.querySelector('.shadow-block');
let startbtn=document.querySelector('.start-button');
function creatingBalloon(){

	let div=document.createElement('div');
	let rand= Math.floor(Math.random() * colours.length);
	div.className='balloons balloon-' + colours[rand];
	rand=Math.floor(Math.random()*(windowwidth - 100));
	div.style.left=rand+'px';
	div.dataset.number=currentballoon;
	currentballoon++;


	body.appendChild(div);
	animateBalloon(div);
}
function animateBalloon(ele){
	let pos=0;
	let rand=Math.floor(Math.random() * 6 - 3);
	let interval=setInterval(frame,12-Math.floor(num/10)+rand);
	 function frame(){
	 	if(pos>=(windowheight+200) && document.querySelector('[data-number="'+ele.dataset.number+'"]')!==null){
	 		clearInterval(interval);
	 		gameover=true;
	 	}
	 	else{
	 		pos++;
	 		ele.style.top=(windowheight-pos)+'px';
	 	}

	 }
}
function deleteballoon(ele){
	popsound();
    num++;
	ele.remove();
	
	updatescore();

}

function updatescore(){
	for(let i=0;i<score.length;i++){
		score[i].textContent=num;
	}
	

}

function startgame(){
	   restartgame();
	   let timeout=0;
       
	   let loop=setInterval(function(){
	   	timeout=Math.floor(Math.random() * 600 - 300)

		if(!gameover && num!==total){
			creatingBalloon();
		}
		else if(num!==total){
			clearInterval(loop);
			totalshadow.style.display='flex';
			totalshadow.querySelector('.loss').style.display='block';


		}
		else{
			clearInterval(loop);
			totalshadow.style.display='flex';
			totalshadow.querySelector('.win').style.display='block';


		}
	},800+timeout)
}

function restartgame(){
	let forremoving=document.querySelectorAll('.balloons');
	for(let i=0;i<forremoving.length;i++){
		forremoving[i].remove();
	}
	gameover=false;
	num=0;
	updatescore();

}

document.querySelector('.restart').addEventListener('click',function(){
	totalshadow.style.display='none';
	totalshadow.querySelector('.loss').style.display='none';
	totalshadow.querySelector('.win').style.display='none';
	startgame();
});
document.querySelector('.end').addEventListener('click',function(){
	totalshadow.style.display='none';
	
});
function popsound(){
	let audio=document.createElement('audio');
	audio.src='sounds/pop.mp3'
	audio.play();
}


document.addEventListener('click',function(event){
	if(event.target.classList.contains('balloons')){
		deleteballoon(event.target);
	}
});
startbtn.addEventListener('click',function(){
	startgame();
	document.querySelector('.playsound').play();
	document.querySelector('.start-window').style.display='none';


});