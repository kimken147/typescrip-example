import { PureComponent } from 'react';
import Throttle from "utils/throttle";
import { bindActionCreators, Dispatch } from 'redux';
import { ActionCreators, ActionCreatorsType } from 'pages/lineTodayRedux';
import { connect } from 'react-redux';

type StateProps = {} & ActionCreatorsType;

class MobileDetector extends PureComponent<StateProps> {
    componentDidMount() {
        window.addEventListener("resize", this.onWindowResize);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.onWindowResize);
    }

    onWindowResize = Throttle(() => {
        if (window.innerWidth <= 1024) {
            this.props.setIsMobile(true);
        }
        else {
            this.props.setIsMobile(false);
        }
    }, 100)

    render() {
        return null;
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(MobileDetector);