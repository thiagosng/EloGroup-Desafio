import { userConstants } from '../constants';

export function users(state = {}, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case userConstants.GETALL_SUCCESS:
            return {
                items: action.users
            };
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case userConstants.DELETE_REQUEST:
            // adicionado 'deleting:true' propriedade para o usuário sendo excluído
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case userConstants.DELETE_SUCCESS:
            // remover usuário excluído do estado
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case userConstants.DELETE_FAILURE:
            // remover 'deleting:true' e adicionar 'deleteError:[error]'  para user 
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        // fazer cópia do usuário sem 'deleting:true' 
                        const { deleting, ...userCopy } = user;
                        // retorna uma copia do usuário com 'deleteError:[error]'
                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                })
            };
        default:
            return state
    }
}