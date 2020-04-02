import React, { PureComponent } from "react";
import { TopicWrapper, TopicItem } from "../style";

import { connect } from "react-redux";

class Topic extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { topicList } = this.props;
    return (
      <TopicWrapper>
        {topicList.map((item, index) => (
          <TopicItem key={index}>
            <img className="topic-pic" src={item.get("imgUrl")} alt="" />
            {item.get("title")}
          </TopicItem>
        ))}
      </TopicWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    topicList: state.getIn(["home", "topicList"])
  };
};

export default connect(mapStateToProps, null)(Topic);
