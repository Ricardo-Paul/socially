import { ApolloLink, Observable } from 'apollo-link';


/**
 * create an apollo link to attach headers to our operations
 */

 export const createAuthLink = () => {
     const request = operation => {
         const token = localStorage.getItem("token");
         operation.setContext({
             headers: {
                "authorization": token
             }
         })
     };

     return new ApolloLink((operation, forward) => {
         let observable;
         new Observable(observer => {
             Promise.resolve(operation)
             .then(oper => request(oper))
             .then(() => { //forwaring the operation returns an observable we can subscribe to
                 observable = forward(operation).subscribe({
                     next: observer.next.bind(observer),
                     complete: observer.complete.bind(observer),
                     error: observer.bind(observer)
                 });
             }).catch(observer.error.bind(observer));

             /**
              * unsubscribe from the subscription
              */
             return () => {
                 if(observable) observable.unsubscribe();
             }
         })
     })
 }

//  next, error,  complete are events emitted by Observables during their lifetime.