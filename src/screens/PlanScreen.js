import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import {loadStripe} from "@stripe/stripe-js";

function PlanScreen() {
    const [products, setProducts] = useState({});
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);
    useEffect(() => {
       db.collection('customers')
       .doc(user.uid).collection('subscribers').get().then(
           querySnapShot => {
               querySnapShot.forEach(async subscription => {
                   setSubscription({
                       role :  subscription.data().role,
                       current_period_end : subscription.data().current_period_end.seconds,
                       current_period_start : subscription.data().current_period_start.seconds,
                   });
               });
           }
       );
    }, [user.uid]);

    useEffect(() => {
        db.collection('products')
        .where('active' ,"==", true).get().then((querySnapShot) => {
            const products = {};
            querySnapShot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection('prices').get();
                priceSnap.docs.forEach(doc => {
                    products[productDoc.id].prices = {
                        priceId : priceSnap.id,
                        priceData : priceSnap.data()
                    }
                });

            });
            setProducts(products);
        });
    }, []);
   const loadCheckout = async (priceId) => {
    const docRef = await db.collection('customers')
    .doc(user.uid)
    .collection("checkout_Sessions")
    .add({
        price: priceId,
        success_url : window.location.origin,
        cancel_url : window.location.origin,
    });
    docRef.onSnapshot(async(snap) => {
        const {error, sessionId } = snap.data();
        if(error){
            // Show an  error to your customer and 
            // inspect your Cloud Function logs in the firebase console.
            alert(`An error occured : ${error.message}`);
        }
        if(sessionId){
            // We have a session, let's redirect to checkout 
            // Init Stripe 
            const stripe = await loadStripe('pk_test_MIICXQIBAAKBgQCkbuuueE8flJHWRVG/4IO1X1sb4zYKT4vBflwFUrTyWxmTwFA7MIICXQIBAAKBgQCkbuuueE8flJHWRVG/4IO1X1sb4zYKT4vBflwFUrTyWxmTwFA7');
           stripe.redirectToCheckout({
               sessionId
           }); 
        }
    });  
};


    return (
        <div className="planScreen">
            <br/>
            {subscription && <p> Renewal Date : {new Date(subscription?.current_period_end * 1000).toLocaleDateString()} </p>}
            {Object.entries(products).map(([productId, productData]) => {
                // Add some login to chekc if the use's subscribtion is active.. 
                const isCurrentPackage = productData.name?.lowerCase().includes(subscription?.role);
                return (  
                <div key={productId} className={`${ isCurrentPackage && "planScreen_plan--disabled"} planScreen__plan `}>
                    <div className="planScreen__info">
                        <h5> {productData.name} </h5>
                        <h6>{productData.description}</h6>
                    </div>
                    <button onClick={() => !isCurrentPackage && loadCheckout(productData?.prices?.priceId)}> {isCurrentPackage ? 'Current Package ' : 'Subscribe'} </button>
                </div>
                );
            })}
        </div>
    )
}

export default PlanScreen
