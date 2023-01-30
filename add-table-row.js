
const form = document.querySelector('form')

const nameInput = document.querySelector('#name')
        
const ageInput = document.querySelector('#age')
        
const sexInput = document.querySelector('#sex')

const salaryInput = document.querySelector('#salary')
        
const submitInput = document.querySelector('#submit')

const tbody = document.querySelector('tbody')

const wrapperSection = document.querySelector('#wrapper') 

const alertMsg = document.querySelector('.alert-msg')
alertMsg.style.cssText='text-align:center; color:yellow; font-size:1.2rem'



        function addEmployee(){

            const employee = {
                name: nameInput.value,
                age: ageInput.value,
                sex: sexInput.value,
                salary: salaryInput.value
            }

            const {name, age, sex, salary} = employee


            if(!name || !age || !sex || !salary){
                
                setTimeout(alertFunc=()=>{
                    alertMsg.textContent=''
                }, 2000, alertMsg.textContent='Please enter details to continue.')
 
            } else {             

                const deleteBtn = document.createElement('button')
                deleteBtn.className = 'delete-btn'
                deleteBtn.textContent = 'delete'
                            
                const editBtn = document.createElement('button')
                editBtn.className = 'edit-btn'
                editBtn.textContent = 'edit'

                let tr = tbody.insertRow()
                tr.className = 'item'

                let tdName = tr.insertCell()
                tdName.className = 'name'
                tdName.textContent = name

                let tdAge = tr.insertCell()
                tdAge.className = 'age'
                tdAge.textContent = age

                let tdSex = tr.insertCell()
                tdSex.className = 'sex'
                tdSex.textContent = sex

                let tdSalary = tr.insertCell()
                tdSalary.className = 'salary'
                tdSalary.textContent = salary     
                    
                let tdDelete = tr.insertCell()
                tdDelete.className = 'delete'
                tdDelete.prepend(editBtn,deleteBtn) 
    
                let tds = tr.children    

                updateTotal()
                    
                tbody.appendChild(tr)
                
                deleteBtn.onclick=function(){

                    let promptDiv = document.createElement('div')
                    promptDiv.className = 'prompt-div'

                    let promptTxt = `Are you sure to remove ${tdName.textContent}?`

                    let yesNoDiv = document.createElement('div')
                    yesNoDiv.className = 'yes-no-div'

                    let yesBtn = document.createElement('button')
                    yesBtn.className = 'yes-btn'
                    yesBtn.textContent = 'YES'

                    let noBtn = document.createElement('button')    
                    noBtn.className = 'no-btn'
                    noBtn.textContent = 'NO'

                    promptDiv.prepend(promptTxt,yesNoDiv)

                    yesNoDiv.prepend(yesBtn,noBtn)

                    if(promptDiv){
                        this.setAttribute('disabled',true)    
                        editBtn.setAttribute('disabled',true)
                        
                        yesBtn.onclick=function(){
                            promptDiv.remove()
                            tr.remove()
                            updateTotal()
                        }

                        noBtn.onclick=function(){
                            promptDiv.remove()
                            deleteBtn.removeAttribute('disabled')    
                            editBtn.removeAttribute('disabled')
                        }
                    }

                    wrapperSection.insertAdjacentElement("beforebegin",promptDiv)
                }
            
                editBtn.onclick=function(){
                    if(this.textContent == 'edit'){
                        this.textContent = 'save'

                            for(let td of tds){
                                if(td.className !=='delete'){
                                    td.style.color='red'
                                    td.setAttribute('contenteditable',true)
                                    }
        
                                td.oninput=function(){
                                    updateTotal()
                                }
                            }   
                    } else {
                        this.textContent = 'edit'

                        for(let td of tds){
                            if(td.className !=='delete'){
                                td.style.color='black'
                                td.removeAttribute('contenteditable')
                            }
                        } 
    
                    }
                }
            }
        }

        

        submitInput.onclick=function(e){
            e.preventDefault()
            addEmployee()

            let inputs = form.querySelectorAll('input')

            for(let input of inputs){
                if(input.id == 'name'){
                    input.focus()
                } 
                
                if(input.id !== 'submit'){
                    input.value = ''
                }
            }
        }

        function updateTotal(){
            let count = 0

            for(let rows of tbody.children){

                let tds = rows.children

                for(let td of tds){
                    if(td.className=='salary'){
                       count += parseInt(td.textContent) 
                    }
                }
            }

            wrapperSection.querySelector('#total-salary').textContent = ` ${count.toLocaleString('en-us',{
                style: 'currency',
                currency: 'php'
            })}`

            wrapperSection.querySelector('#total-employee').textContent = ` ${tbody.children.length}`
        }

    