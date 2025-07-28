// Import the necessary Polaris components
import { Page, Layout, Card, Text, Box, Thumbnail, ResourceList, ResourceItem } from "@shopify/polaris";

// Import the loader Function type json function and useLoaderData from remix
import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// 18. import the Thumbnail component
import { ProductIcon } from "@shopify/polaris-icons";

// 9. import the authenticate function
import { authenticate } from "../shopify.server";

// 7. Now we will fetch shopify online store data with graphql. Create the fetch request in the loader function
// request type is LoaderFunctionArgs
export const loader = async ({ request }: LoaderFunctionArgs) => {
    // 10. Create the authenticate admin request
    const { admin } = await authenticate.admin(request);

    // 11. Create the graphql request
    const response = admin.graphql(`
        #graphql
        query fetchProducts {
            products(first: 10) {
                edges {
                    node {
                        id
                        title
                        handle
                        featuredImage {
                            url
                        }
                    }
                }
            }
        }    
    `)

    //  12. convert the response to json and store it in a variable
    const productsData = (await (await response).json()).data

    return json({
        products: productsData.products.edges
    })

}

// 2. create a function to render the page
export default function Products() {
    // Get the shop data from the loader
    const { products } = useLoaderData<typeof loader>();

    // 17. create a function to render the media
    const renderMedia = (image: any) => {
        return image ? <Thumbnail source={image.url} alt={image.altText} /> 
            : <Thumbnail source={ProductIcon} alt="Product" /> // 18. render the thumbnail if there is no image
    }

    // 16. create a function to render the resource list
    const renderItem = (item: typeof products[number]) => {
        const { id, url, title, handle, featuredImage } = item.node;
        
        // 19. render media
        return (
            <ResourceItem
                id={id}
                media={renderMedia(featuredImage)}
                url={url}
                onClick={() => {shopify.toast.show(`${title} :Product clicked`)}}
            >
            <Text as="h5" variant="bodyMd"> {title} </Text>
            <div>{handle}</div>
            </ResourceItem>
        )
    }

    return (
        <Page>

            {/* 5. render the title bar */}
            <ui-title-bar title="July Products">
                <button variant="primary" onClick={() => {
                    shopify.modal.show("create-product-modal");
                }}>Create a New Product</button>
            </ui-title-bar>

            {/* 6. Create and render a modal */}
            <ui-modal id="create-product-modal">
                <ui-title-bar title="Create a New Product">
                    <button variant="primary">Create</button>
                </ui-title-bar>
                <Box padding="400">
                    <Text as="h2">This is where you create a new product</Text>
                </Box>
            </ui-modal>
            
            {/* 4. render the page Layout */}
            <Layout>
                <Layout.Section>
                    <Card>
                        {/* 15. render the resource list */}
                        <ResourceList 
                            resourceName= {{
                                singular: "Product",
                                plural: "Products"
                            }}
                            items={products}
                            renderItem={renderItem}
                        />
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}