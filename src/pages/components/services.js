 import { FaShoppingCart, FaRegBookmark, FaStar, FaFireAlt, FaTelegramPlane, FaHeart  } from 'react-icons/fa';

export function Products({service}) {
  if (!service || Object.keys(service).length === 0) {
    // If service is undefined or an empty object, handle accordingly (e.g., return null or a placeholder)
    return null; // Or return a message indicating that the service data is not available
  }
  return (
    <div className="section">
   <div className="productList">
        <div key={service.id} className="productCard">

        <img alt="product-img" className="productImage" />

          <div className="productCard__content">
            <div className='icons'>
          <FaTelegramPlane className='icon'/>
          <FaHeart className="icon"/>
          </div>
        
                <div className="displayStack__2">
                  <div className="productRating">
                    <div className='ratingContainer'>
                     
                    </div>
                  </div>
                </div>
            <h3 className="productName">{service.serviceType}</h3>
            <div className='provider_name'> {service.serviceProviderEmail}</div>
              <div className="productPrice">Price<br/>${service.pricePerHour}/hr</div>
           
            <div className="productSales">({service.availability})</div>

          </div>
        </div>
      </div>

 
      <style jsx>{`
    .icons{
      width: 100%;
   
      height: auto;
      display: flex;
      justify-content: space-between;

      
    }
    .productList{
      padding-top: 10px;
    }
   
      .productRating {
        display: flex;
        justify-content: center; /* Center horizontally */
        align-items: center; /* Center vertically */
        margin: 2rem 0;
        margin-bottom: -5px;
        
      }

      .ratingContainer {
        display: flex;
        align-items: center;
        
      }

      .starIcon {
        margin: 0 2px; /* Adjust the spacing between stars if needed */
        color: #ff0066;
        font-weight: bold;
      }
        .productList {
          display: grid;
          
          justify-content: space-evenly;
          align-items: center;
          margin-top: 0rem;
          
        }

        .productCard {
          position: relative;
          background-color: var(--color-grey-primary);
        
          flex: 1 0 25rem;
          max-width: 200px;
          max-height: 20rem;
          transition: 0.2s;
          background-color: #fff;
          margin-bottom: 10px;
          border-radius: 10px;
        color: #ff0066;
        border: 2px solid #ff0068;
     
          
      
          
        }
        .productCard img{
          width: 60px;
          padding: 10px;
          object-fit: cover;
          height: auto;
          background-color: #ff0066;
          position: absolute;
          margin-top: -30px;
          margin-bottom: 10px;
          left: 30%;
          border-radius: 20px;
          
        }

        .productCard:hover {
          transform: translateY(-0.5rem);
          box-shadow: 0.5rem 0.75rem 1.5rem #bbbbbb;
          background-color: black;
          color: pink;
          cursor: pointer;

          .provider_name{
      
        border-bottom: 2px solid #fff;   
        border-top: 2px solid #fff;   
        
           }
          
        }

        .productImage {
          margin-top: 2rem;
          max-width: 100%;
          height: auto;
          margin-right: 20px;
         
          
        }

        .productCard__cart {
          position: absolute;
          right: 0;
          margin: 1rem;
          font-size: 2rem;
          transition: 0.2s;
          cursor: pointer;
        }

        .productCard__wishlist {
          position: absolute;
          right: 3rem;
          margin: 1rem;
          font-size: 2rem;
          transition: 0.2s;
          cursor: pointer;
        }

        .productCard__fastSelling {
          position: absolute;
          font-size: 12px;
          left: 0;
          margin: 1rem;
          fill: var(--color-orange-primary);
        }

        .productCard__content {
         padding: 20px;
          width: 100;
        }

        .productName {
          font-size: 16px;
          text-align: center;
        
       

        }

        .displayStack__1
         {
          margin: 2rem 0;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
         font-weight: bold;
          font-size: 12px;
          width: 100%;
        }

        .productPrice {
          font-size: 12px;
          font-weight: bold;
          padding-top: 7px;
          text-align: center;
       
          width: 100%;
        }

        
        .productTime {
          font-size: 11px;
          
        }
        .productSales{
          padding-top: 8px;
          text-align: center;
          
        }
   .provider_name{
    width: 150px; 
   margin-bottom: 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
padding-top: 10px;
padding-bottom: 10px;
border-bottom: 2px solid #454545;   
border-top: 2px solid #454545;   

   }

   @media (max-width: 768px){
    .productList{
      display: block;
      margin: 10px;
    }
    .productCard{
      width: 110px;
      height: 150px;
      font-size: 12px;
      padding: 0;
      background: #fff;

    }
    .productCard img{
      width: 40px;
      margin-left: 0px;
      
          padding: 10px;
          object-fit: cover;
          height: auto;
          background-color: #ff0066;
          position: absolute;
          margin-top: -40px;
          margin-bottom: 10px;
          left: 22%;
          border-radius: 20px;
    }
    .productCard__content{
      padding: 8px;
    }
    .icons{
     
      
     padding:
      left: 0;

    }

    .productRating {
      display: flex;
      justify-content: center; /* Center horizontally */
      align-items: center; /* Center vertically */
   margin: 0;
   margin-top: 5px;
      
    }

    .ratingContainer {
      display: flex;
      align-items: center;
      
    }
    .productName{
      font-size: 12px;
      margin: 0;
      margin-top: 3px;
    }
    .provider_name{
      width: 100px;
      margin: 0;
      margin-top: 8px;
      font-size: 11px;

    }
    .displayStack__1{
      margin: 0;
      margin-top: 5px;
      background: red;
      justify-content: center;
     
    }
    .productPrice{
      font-size: 10px;
      margin: 0;
    }
    .productSales{
      margin: 0;
      font-size: 8px;
    }
   }
      `}</style>
    </div>
  );
}
export default Products;