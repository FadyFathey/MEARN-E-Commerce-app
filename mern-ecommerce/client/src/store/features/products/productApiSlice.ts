import { apiSlice } from '@/store/apiSlice';
import { IProduct } from '@/types/prodcut';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewArrivals: builder.query<
      IProduct[],
      { queryParam: string; page?: number; limit?: number } | void
    >({
      query: (params) => {
        const queryParam = params?.queryParam ?? 'new-arrivals';
        let queryString = `/products/${queryParam}`;

        // Add pagination parameters if provided
        if (params) {
          const searchParams = new URLSearchParams();
          if (params.page !== undefined) searchParams.append('page', params.page.toString());
          if (params.limit !== undefined) searchParams.append('limit', params.limit.toString());
          queryString += `?${searchParams.toString()}`;
        }

        return queryString;
      },
      transformResponse: (response: { data: IProduct[] }) => response.data,
    }),
  }),
});

export const { useGetNewArrivalsQuery } = productApiSlice;
