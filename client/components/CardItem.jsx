import { FlatButton, Card, CardActions, CardMedia, CardTitle } from 'material-ui';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import Moment from 'moment';
import BigCalendar from 'react-big-calendar';
import Calendar from './DatePicker.jsx';
import TimePicker from './TimePicker.jsx';
import ChooseABoard from './ChooseBoard.jsx';
import CardData from '../../imports/collections/CardData';
import Welcome from './Welcome.jsx';

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(Moment));

const styles = {
  display: 'wrap',
  flexDirection: 'row wrap',
  width: 'auto%',
  textOverflow: 'ellipsis',
  wordWrap: 'break-word',
};

const mediaStyles = {
  padding: '8px',
};

class CardItem extends React.Component {

  state = {
        // pin
    image_url: '',
    note: '',
    selectedBoardUrl: '',
    board: '',
    link: '',

        // time
    hours: 0,
    minutes: 0,

        // date
    day: 0,
    month: 0,
    year: 0,
    date: 0,
  };

  setTime = (hours, minutes) => {
    this.setState({ minutes });
    this.setState({ hours });
  };

  setDate = (day, month, year) => {
    this.setState({ day });
    this.setState({ month });
    this.setState({ year });
  };

  setBoard = (selectedBoardUrl) => {
    if (selectedBoardUrl !== null) {
      let boardSpec = '';
      let slashCounter = 0;

      for (let i = 0; i < selectedBoardUrl.length - 2; i += 1) {
        if (selectedBoardUrl[i] === '/') {
          slashCounter += 1;
        }
        if (slashCounter >= 3) {
          boardSpec += selectedBoardUrl[i + 1];
          this.setState({ board: boardSpec });
        }
      }
      this.setState({ selectedBoardUrl });
    }
  };

  insertCardData = () => {
    const cardInsertData = {};

    cardInsertData.destinationBoardTitle = this.state.selectedBoardUrl;
    cardInsertData.destinationBoardLink = this.state.selectedBoardUrl;
    cardInsertData.board = this.state.board;
    cardInsertData.note = this.props.pin.note;
    cardInsertData.image_url = this.props.pin.image.original.url;
    cardInsertData.link = this.props.pin.original_link;

    cardInsertData.day = this.state.day;
    cardInsertData.month = this.state.month;
    cardInsertData.year = this.state.year;

    cardInsertData.hours = this.state.hours;
    cardInsertData.minutes = this.state.minutes;

    cardInsertData.userId = Meteor.userId();
    cardInsertData.date = new Date(this.state.year, this.state.month - 1, this.state.day, this.state.hours, this.state.minutes);
    CardData.insert(cardInsertData);
  };

  handleOnClickSubmit = () => {
    this.insertCardData();
  };

  render() {
    if (this.props.pin) {
      return (
        <div>
          <Card>
            <CardMedia style={mediaStyles}>
              <img alt="Pin" src={this.props.pin.image.original.url} />
            </CardMedia>
            <CardTitle style={styles} title=" " subtitle={this.props.pin.note} />
            <CardActions>
              <ChooseABoard onChange={this.setBoard} />
              <TimePicker onChange={(hours, minutes) => this.setTime(hours, minutes)} />
              <Calendar
                onChange={(day, month, year) => this.setDate(day, month, year)}
                day={this.state.date}
              />
              <FlatButton
                label="Submit" primary
                onClick={this.handleOnClickSubmit}
              />
            </CardActions>
          </Card>
        </div>
      );
    }
    return (
      <div>
        <Welcome />
      </div>
    );
  }
}

export default CardItem;
