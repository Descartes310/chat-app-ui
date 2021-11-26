import { connect } from 'react-redux';
import { setAuthUser } from '../actions/AuthActions';

function Chat(props: any) {
    return (
        <div>
            <p>Je suis dans la messagerie de {props.authUser.fullName}</p>
        </div>
    )
}

// map state to props
const mapStateToProps = (state: any) => {
    const { authUser } = state
    return { authUser: authUser.data };
};

export default connect(mapStateToProps, { setAuthUser })(Chat);