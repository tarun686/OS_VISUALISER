function setmemory(){
    const block1=document.querySelector(".block1");
    const all = block1.querySelectorAll('div'); 
    all.forEach(child => block1.removeChild(child));
    const memory=document.getElementById("memo").value.trim();

    const output = document.getElementById("txt");
    output.innerHTML = "";

    if (!memory) {
        output.innerHTML = " Memory input cannot be empty.";
        return;
    }

    const memoarray = memory.split(" ");
    const valid = memoarray.every(value => /^[0-9]+$/.test(value) && parseInt(value) >= 0);

    if (!valid) {
        output.innerHTML = " Please enter only non-negative integers (no alphabets or symbols).";
        return;
    }

    if (memoarray.length > 10) {
        output.innerHTML = " Maximum memory blocks limit is 10.";
        return;
    }

    if(memoarray.length>10)
    {
        document.getElementById("txt").innerHTML="Maximum memory blocks limit is 10!"
    }
    else{

        memoarray.forEach(element => {
            console.log(element);
            let item=document.createElement("div");
            item.classList.add("item");
            item.innerText=element;
            block1.appendChild(item);
        });
    }
}


function firstfit(pages,memo){
    const block2=document.querySelector(".block2");
    const allpage = block2.querySelectorAll('div'); 
    allpage.forEach(child => block2.removeChild(child));
    const arr = new Array(memo.length).fill(0);
    pages.forEach(element => {
        let flag=0;
    
        for(let i=0;i<memo.length;i++)
        {
            if(element<=memo[i] && arr[i]==0)
            {
                flag=1;
                arr[i]=1;
                let item=document.createElement("div");
                item.classList.add("item");
                item.style.backgroundColor="#90ee90";
                item.innerText=element+"・Allocated to memory block - "+ (i+1);
                block2.appendChild(item);
                break;
            }
            
        }
            if(flag==0){
                let item=document.createElement("div");
                item.classList.add("item");
                item.innerText=element+" ∙ Not allocated";
                item.style.backgroundColor="pink";
                block2.appendChild(item);
            }

    });
}

function worstfit(pages, memo) {
    const block2 = document.querySelector(".block2");
    const allpage = block2.querySelectorAll('div');
    allpage.forEach(child => block2.removeChild(child));

    const arr = new Array(memo.length).fill(0); 

    pages.forEach(element => {
        let max = 0, index = -1;

        for (let i = 0; i < memo.length; i++) {
            if (memo[i] > max && arr[i] === 0) {
                max = memo[i];
                index = i;
            }
        }

        const item = document.createElement("div");
        item.classList.add("item");

        if (max >= element && index !== -1) {
            arr[index] = 1; 
            item.innerText = element + " ∙ Allocated to memory block - " + (index + 1);
            item.style.backgroundColor = "#90ee90";
        } else {
            item.innerText = element + " ∙ Not allocated to memory block";
            item.style.backgroundColor = "pink";
        }

        block2.appendChild(item);
    });
}

function bestfit(pages, memo) {
    const block2 = document.querySelector(".block2");
    const allpage = block2.querySelectorAll('div');
    allpage.forEach(child => block2.removeChild(child));

    const arr = new Array(memo.length).fill(0); 

    pages.forEach(element => {
        let min = Infinity, index = -1;

        for (let i = 0; i < memo.length; i++) {
            if (memo[i] >= element && arr[i] === 0 && memo[i] < min) {
                min = memo[i];
                index = i;
            }
        }

        const item = document.createElement("div");
        item.classList.add("item");

        if (index !== -1) {
            arr[index] = 1; 
            item.innerText = element + " ∙ Allocated to memory block - " + (index + 1);
            item.style.backgroundColor = "#90ee90";
        } else {
            item.innerText = element + " ∙ Not allocated to memory block";
            item.style.backgroundColor = "pink";
        }

        block2.appendChild(item);
    });
}

function applyfit() {
    
    const sizeInput = document.getElementById("size").value.trim();
    const output = document.getElementById("txt");
    output.innerHTML = "";

    if (!sizeInput) {
        output.innerHTML = "❌ Page sizes input cannot be empty.";
        return;
    }

    const sizes = sizeInput.split(" ");
    const valid = sizes.every(value => /^[0-9]+$/.test(value) && parseInt(value) >= 0);

    if (!valid) {
        output.innerHTML = "❌ Please enter only non-negative integers for page sizes.";
        return;
    }






    const page = document.getElementById('size').value;
    const pagearray = page.split(" ").map(Number);

    const memory = document.getElementById("memo").value;
    const memoarray = memory.split(" ").map(Number);
    let algo = document.getElementById('algo').value;
    if(algo=="First-fit")
    {

        firstfit(pagearray, memoarray);
    }
    else if(algo=="worst-fit")
    {
        worstfit(pagearray,memoarray);
    }
    else{
        bestfit(pagearray,memoarray);
    }
}
