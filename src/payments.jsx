export default function Payments(){
    const merchentId="M22Q1HH0WG7FE";
    const merchantTransactionId=`SC-TXN-${Date.now()}`
    const amount = 1;
    
    return(
        <>
        <p>Yello {merchantTransactionId}</p>
        </>
    )
}