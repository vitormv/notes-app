export const DEFAULT_NODE = 'paragraph';

export const InitialValue = {
    document: {
        data: {},
        nodes: [
            {
                data: {},
                isVoid: false,
                nodes: [
                    {
                        leaves: [
                            {
                                marks: [],
                                object: 'leaf',
                                text: 'Ahhh, what to write, then?',
                            },
                        ],
                        object: 'text',
                    },
                ],
                object: 'block',
                type: 'heading-one',
            },
            {
                data: {},
                isVoid: false,
                nodes: [
                    {
                        leaves: [
                            {
                                marks: [],
                                object: 'leaf',
                                text: '',
                            },
                        ],
                        object: 'text',
                    },
                ],
                object: 'block',
                type: 'paragraph',
            },
            {
                data: {},
                isVoid: false,
                nodes: [
                    {
                        leaves: [
                            {
                                marks: [],
                                object: 'leaf',
                                text: 'This is editable ',
                            },
                            {
                                marks: [
                                    {
                                        data: {},
                                        object: 'mark',
                                        type: 'bold',
                                    },
                                ],
                                object: 'leaf',
                                text: 'rich',
                            },
                            {
                                marks: [],
                                object: 'leaf',
                                text: ' text, ',
                            },
                            {
                                marks: [
                                    {
                                        data: {},
                                        object: 'mark',
                                        type: 'italic',
                                    },
                                ],
                                object: 'leaf',
                                text: 'much',
                            },
                            {
                                marks: [],
                                object: 'leaf',
                                text: ' better than a ',
                            },
                            {
                                marks: [
                                    {
                                        data: {},
                                        object: 'mark',
                                        type: 'code',
                                    },
                                ],
                                object: 'leaf',
                                text: '<textarea>',
                            },
                            {
                                marks: [],
                                object: 'leaf',
                                text: '!',
                            },
                        ],
                        object: 'text',
                    },
                ],
                object: 'block',
                type: 'paragraph',
            },
            {
                data: {},
                isVoid: false,
                nodes: [
                    {
                        leaves: [
                            {
                                marks: [],
                                object: 'leaf',
                                text: "Since it's rich text, you can do things like turn a selection of text ",
                            },
                            {
                                marks: [
                                    {
                                        data: {},
                                        object: 'mark',
                                        type: 'bold',
                                    },
                                ],
                                object: 'leaf',
                                text: 'bold',
                            },
                            {
                                marks: [],
                                object: 'leaf',
                                text: ', or add a semantically rendered block quote in the middle of the page, like this:',
                            },
                        ],
                        object: 'text',
                    },
                ],
                object: 'block',
                type: 'paragraph',
            },
            {
                data: {},
                isVoid: false,
                nodes: [
                    {
                        leaves: [
                            {
                                marks: [],
                                object: 'leaf',
                                text: 'A wise quote.',
                            },
                        ],
                        object: 'text',
                    },
                ],
                object: 'block',
                type: 'block-quote',
            },
            // {
            //     data: {
            //         src: 'https://img.washingtonpost.com/wp-apps/imrs.php?src=https://img.washingtonpost.com/news/speaking-of-science/wp-content/uploads/sites/36/2015/10/as12-49-7278-1024x1024.jpg&w=1484',
            //     },
            //     isVoid: true,
            //     nodes: [
            //         {
            //             leaves: [
            //                 {
            //                     marks: [],
            //                     object: 'leaf',
            //                     text: '',
            //                 },
            //             ],
            //             object: 'text',
            //         },
            //     ],
            //     object: 'block',
            //     type: 'image',
            // },
            {
                data: {},
                isVoid: false,
                nodes: [
                    {
                        leaves: [
                            {
                                marks: [],
                                object: 'leaf',
                                text: 'Try it out for yourself!',
                            },
                        ],
                        object: 'text',
                    },
                ],
                object: 'block',
                type: 'paragraph',
            },
        ],
        object: 'document',
    },
    object: 'value',
};
