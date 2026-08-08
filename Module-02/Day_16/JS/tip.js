// Accepting values (they should be accepted from the user)
let  bill="2000"
let partySize=5

// Total and per person amount
perPersonAmount=bill/partySize
console.log(`The amount each person gonna pay is ${perPersonAmount}`)

// Tiping
if (bill>300){
    bill*=0.1
    console.log(`Tip=${bill}`)
}
else{
    bill*=0.05
    console.log(`Tip=${bill}`)
}

// Service fee by switch
let method="CBE"
switch (method){
    case 'CBE':
        console.log('Paid with CBE')
        break
    case 'Telebirr':
        console.log('Paid with Telebirr')
        break
    case 'Abyssinia':
        console.log('Paid with Abyssinia')
        break
    default:
        console.log('Unknown method!')
}