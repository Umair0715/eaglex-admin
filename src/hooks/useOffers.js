import { useDispatch, useSelector } from 'react-redux';
import { getAllOffers, createOffer, editOffer, deleteOffer } from 'redux/actions/offerActions';
import { useQuery, useMutation, useQueryClient } from 'react-query';


export const useGetAllOffers = () => {
    const dispatch = useDispatch();
    const offers = useSelector((state) => state.offer);

    return useQuery('offers', async () => {
        await dispatch(getAllOffers());
        return offers;
    });
};

export const useCreateOffer = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    return useMutation((data) => dispatch(createOffer(data)), {
        onSuccess: () => {
        queryClient.invalidateQueries('offers');
        },
    });
};

const useEditOffer = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    return useMutation((offerId, updateData) => dispatch(editOffer(offerId, updateData)), {
        onSuccess: () => {
            queryClient.invalidateQueries('offers');
        },
    });
};

export const useDeleteOffer = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    return useMutation((offerId) => dispatch(deleteOffer(offerId)), {
        onSuccess: () => {
            queryClient.invalidateQueries('offers');
        },
    });
};
