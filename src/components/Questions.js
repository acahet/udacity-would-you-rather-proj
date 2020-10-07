import React, { Component } from 'react'
import { connect } from 'react-redux'
 class Questions extends Component {
    render() {
        return (
            <div>
                Questions
            </div>
        )
    }
}
function mapStateToProps({ authedUser }) {
	return { authedUser };
}
export default mapStateToProps()(Questions)
