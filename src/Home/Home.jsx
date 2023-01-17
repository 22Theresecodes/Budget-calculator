import React from 'react'
import './Home.css'
import {MdModeEditOutline} from 'react-icons/md'
import {RiDeleteBin4Fill} from 'react-icons/ri'
import {IoSendSharp} from 'react-icons/io5'
import { data } from './data'
const Home = () => {
    const [charge, setCharge] = React.useState('')
    const [amount, setAmount] = React.useState(0)
    const [expenses, setExpenses] = React.useState(data)
    const [id, setId] = React.useState(0)
    const [edit, setEdit] = React.useState(false)
    
    const handleCharge = (e) => {
        setCharge(e.target.value)
    }

    const handleAmount = (e) => {
        setAmount(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(charge !== '' && amount > 0){
            if(edit){
                let tempExpenses = expenses.map(item => {
                    return item.id === id ? {...item, charge, amount} : item
                })
                setExpenses(tempExpenses)
                setEdit(false)
            }else{
                const singleExpense = {id: new Date().getTime().toString(), charge, amount}
                setExpenses([...expenses, singleExpense])
                console.log(singleExpense)
            }
            
            setCharge('')
            setAmount('')
      
        }else{
            console.log('charge cannot be empty value and amount value has to be bigger than zero')
        }
    }

    const handleDelete = (id) => {
        let tempExpenses = expenses.filter(item => item.id !== id)
        setExpenses(tempExpenses)
    }

    const handleEdit = (id) => {
        let expense = expenses.find(item => item.id === id)
        let {charge, amount} = expense
        setCharge(charge)
        setAmount(amount)
        setId(id)
        setEdit(true)
       
    }
  return (
    <div>
        <h1>Budget Calculator</h1>

        <section className='card'>
            <div className='form'>
                <div className='form1'>
                    <h2>Charge</h2>
                    <input type='text' placeholder='e.g. rent' name='charge' onChange={handleCharge}  />
                </div>
                <div className='form2'>
                    <h2>Amount</h2>
                    <input type='text' placeholder='e.g. 100' name='amount' onChange={handleAmount} />
                </div>
            </div>
            
            <button onClick={handleSubmit}>{!edit ? `Submit` : `Edit`}<IoSendSharp /></button>

            {expenses.map((item) => {
            return (<div className='order-card' key={item.id}>
                <h2>{item.charge}</h2>
                <h2 className='amount'>{item.amount}</h2>
                <div>
                    <MdModeEditOutline onClick={()=> handleEdit(item.id)} />
                    <RiDeleteBin4Fill onClick={()=> handleDelete(item.id)} />
                </div>
            </div>
            )}
            )}        
        </section>

        <h3>Total Spending:<span>{expenses.reduce((curr, item) => {
            return (curr += (+item.amount))}, 0 )}</span> </h3>


    </div>
  )
}

export default Home