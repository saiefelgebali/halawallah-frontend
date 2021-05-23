import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
	typePolicies: {
		Profile: {
			keyFields: ["profile_id"],
		},
		Query: {
			fields: {
				feed: {
					// Don't cache separate results based on
					// any of this field's arguments.
					keyArgs: false,

					merge: (existing, incoming, { args: { offset = 0 } }) => {
						const merged = { ...incoming };

						// Slicing is necessary because the existing data is
						// immutable, and frozen in development.
						merged.data = existing ? existing.data.slice(0) : [];
						for (let i = 0; i < incoming.data.length; ++i) {
							merged.data[offset + i] = incoming.data[i];
						}
						return merged;
					},
				},
				getPostsByUsername: {
					// Don't cache separate results based on
					// any of this field's arguments.
					keyArgs: false,

					merge: (existing, incoming, { args: { offset = 0 } }) => {
						const merged = { ...incoming };

						// Slicing is necessary because the existing data is
						// immutable, and frozen in development.
						merged.data = existing ? existing.data.slice(0) : [];
						for (let i = 0; i < incoming.data.length; ++i) {
							merged.data[offset + i] = incoming.data[i];
						}
						return merged;
					},
				},
			},
		},
	},
});
