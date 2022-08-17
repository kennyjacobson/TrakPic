import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import './App.css';
import Layout from './components/Layout';

const httpLink = createHttpLink({
  uri: 'https://api-us-west-2.hygraph.com/v2/cl6wpq2kb4kdf01t68i6de2ps/master',
})

const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjA2ODY1ODQsImF1ZCI6WyJodHRwczovL2FwaS11cy13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2w2d3BxMmtiNGtkZjAxdDY4aTZkZTJwcy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNTkxNGQ4ZDctZDBiZS00MzcwLTgwYTEtZDY0MzVkZWY4ZWFmIiwianRpIjoiY2w2d3B3eHBiNGtvMjAxdDZjcjZ6OTFndyJ9.hwZs2YFn5TMijj__LzS2WJ0ns1wOEDIHDXcLw1JSjWMT2X_ECNdb5WRK3YodwkV-DfG90cgtJ0Lt-vv2Yt7H6rPnKK5IFqeK5Dw9YC_JfhVw3wisaa5x_AQU3p1j5y0i4LR5PjFExbKhMlJ0aEGuZK9sSDklEtD0dJ_T869l--RLJfqKm4PjqgEOUU6Ed6RxEFd-jjRn90q2fY1nTLP2YYFWorzYGgDKGrg76Yo8U4Hai2V8y9jdSvAsQMiRD6PLNFMgKQ9G1-fUJspZbZwLGEZ7xUiIvzEvID9xBPTv35kXqBzGmD2kOvVZuYRUxtHepjEmKFb8AkG8KJrwQC6_HWrCnARaaRd5RhjijhucHe6HwI_3kvjJP1Y1qEmQciwMghnd8rz96sHqZ1HGduxpJfjrYpsZ8TNmBJ-7MY14DPmV9H-iCGyTxg3puQXSUxinmA_-gn38a_fWcU0HMbFTT3DFpjto166G76dnpHHx2LsCLZGmJLMU4dKvFF_m2_gLwESf-4o9vc01DGxqNKVuC1-VlsnIwsOi5yaEecrBPPWfkjJTkXIPPcdI8e0E1sWx9Cn0OzdJ2EVE8SIl46PkdEPKvASHwes9BndKUsK5cdnxr7BtBMC-V5ilgYF5CvTMlXWWEUl-17EakSm1GLJowK4yzLgEtOi8mn-KXNpTZ78"
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  //const token = localStorage.getItem('token');

  // print('token: ', token)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div >
        <Layout ></Layout>
      </div>
    </ApolloProvider>
  );
}

export default App;
