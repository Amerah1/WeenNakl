import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



class App extends Component {
constructor(props) {
    super(props);
    this.state = {
      latitude:null,
      longitude:null,
       posts:{},
       

  };

 this.getLocation=this.getLocation.bind(this);
 this.getCoordinates= this.getCoordinates.bind(this);
 this.getData= this.getData.bind(this);
  }



  componentDidMount() {
  this.getLocation();
  //this.getData();

  }



getData(){
  fetch('/api/v1/GenerateFS.php?uid=26.2716025,50.2017993&get_param=value')
    .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({posts:json});
        this.getinfo(this.posts);
     });

}

getinfo(data){
    console.log('inside getData');
    console.log(data);
}


///location of user

  getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getCoordinates);

  /////posting location of user to api
        let result = fetch('/api/v1/GenerateFS.php?uid=26.2716025,50.2017993&get_param=value', {
         method: 'post',
         mode:'cors',
         headers: { 'Accept': 'application/json','Content-Type': 'application/json , text/plain'},
         body:{
         "UID":this.latitude+","+this.longitude
              }

       })
    /////posting location of user to api




      } else {
        alert("Geolocation is not supported by this browser.");
      }

  }



  getCoordinates(position){
  this.setState ({
  latitude:position.coords.latitude,
  longitude:position.coords.longitude
  })
  }












  render() {
//const posts = this.state;
  //  console.log(posts);
  const mystyle = {
    fontfamily:"Times New Roman",
    color:"green"
    };
  const  mystyle2 = {
        margin:"0 auto 0 auto",
        paddingleft: "30%",
        alignContent:"center"
      };


  return (


    <div className="container">

        <h1 >ويـــن نأكــــل ؟</h1>

        <button onClick={this.getData}>    !اقتــــرح لــي  </button>
         <h1 className="card-text" style={mystyle}>{this.state.posts.name}</h1>
          <p className="card-text">{this.state.posts.cat}</p>



              <Map google={this.props.google} style={{width: '50%', height: '50%' ,alignContent: 'center'}}

              zoom={14}

              initialCenter={{
             lat:26.297090314202,
             lng:50.216002426978
                        }}


          onMapLoad={map => {
          var marker = new window.google.maps.Marker({
            position: { lat :26.297090314202, lng: 50.216002426978},
            map: map,
            title: 'Hello Istanbul!'
          });
        }}

                >




            </Map>


            /* //one way maybe run correcrt

              { this.state.posts.lat&&this.state.posts.lon ?
             //https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places
              <img src={'https://maps.googleapis.com/maps/api/staticmap?center=${this.state.posts.lat},${this.state.posts.lon}&zoom=14&size=400x300&sensor=false&key=AIzaSyDVfgxIw6stvKoRuYPPolP3Jw_IpPjzMBA'} alt='no'/>
           :
           //https://maps.googleapis.com/maps/api/staticmap?center=${this.state.posts.lat},${this.state.posts.lon}&zoom=14&size=400x300&sensor=false&key=AIzaSyBqJxU65ngOAgENUvfvjRXL_GSoS_FrlT4

           null

               }
           */ //one way maybe run correcrt
          </div>




  );
}
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDVfgxIw6stvKoRuYPPolP3Jw_IpPjzMBA')
})(App)
