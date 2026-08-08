let  bill="2000"
let partySize=5

perPersonAmount=bill/partySize
console.log(`The amount each person gonna pay is ${perPersonAmount}`)

if (bill>300){
    bill*=0.1
    console.log(`Tip=${bill}`)
}
else{
    bill*=0.05
    console.log(`Tip=${bill}`)
}

let method="CBE"
switch (method){
    case 'CBE':
        console.log('Paid with CBE')
        break
    case 'Telebirr':
        console.log('Paid with Telebirr')
        break
    default:
        console.log('Unknown method!')
}

