import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = ( WrapperComponents, axios ) => {
    
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount(){
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })
            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                console.log(error)
                this.setState({error: error})
            })
        }

        componentWillUnmount(){
            console.log('will unmount', this.resInterceptors, this.resInterceptors)
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
            console.log('will unmount', this.resInterceptors, this.resInterceptors)
        }

        errorConfirmHandler = () => {
            this.setState({
                error: null
            })
        }
        render(){
            return(<Aux>
                <Modal 
                show = {this.state.error}
                modalClosed = {this.errorConfirmHandler} >
                    {this.state.error? this.state.error.message : null}
                </Modal>
                <WrapperComponents {...this.props}/>
            </Aux>)
        }
    } 
}

export default withErrorHandler
