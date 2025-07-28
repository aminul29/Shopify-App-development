// 1. Import the necessary Polaris components
import{ Page, Layout, Card, Text, Button, Box } from "@shopify/polaris";

// 8. Import the loader Function type json function and useLoaderData from remix
import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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
        query fetchshop {
            shop {
                id
                name
            }
        }    
    `)

    //  12. convert the response to json and store it in a variable
    const shopData = (await (await response).json()).data

    // 13. log the data
    console.log(shopData);
    return json({
        shop: shopData.shop
    })

}



// 2. create a function to render the page
export default function Products() {

    // 14. get the shop data from the loader
    const { shop } = useLoaderData<typeof loader>();

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
                        {/* 15. render the shop name */}
                        <Text as="h2" variant="headingMd">{shop.name}</Text>
                        <Button onClick={() => {
                            shopify.toast.show("Button clicked");
                        }}>HeLLo</Button>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}