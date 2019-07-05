import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import message from "../../components/feedback/message";
import MessageContent from "../Feedback/Message/message.style";

// import AddressSection from './AddressSection';
import CardSection from './cardSection';

class CheckoutForm extends React.Component {
  handleSubmit = (ev) => {
    // this.props.loadingBilling();
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: this.props.user.first_name + " " + this.props.user.last_name}).then(({token}) => {
      if(!token) {
        message.error(
          <MessageContent>
            <span>Please enter a valid credit card.</span>
          </MessageContent>,
          10
        );
        // this.props.loadingBilling();
      } else {
        this.props.saveCard(token);
        // console.log('Received Stripe token:', token);
      }

    });

    // However, this line of code will do the same thing:
    //
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

    // You can also use createSource to create Sources. See our Sources
    // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
    //
    // this.props.stripe.createSource({type: 'card', name: 'Jenny Rosen'});
  };

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <div className="isoAlGridContents">
            <CardSection />
            <div className="isoSelectButton">
              <button type="primary" className="ant-btn-primary ant-btn iChtnW">Save Card</button>
            </div>
          </div>
        </form>
    );
  }
}

export default injectStripe(CheckoutForm);
