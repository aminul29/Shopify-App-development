import{ Page, Layout, Card, Text, Button, Box } from "@shopify/polaris";

export default function Products() {
    return (
        <Page>

            <ui-title-bar title="July Products">
                <button variant="primary" onClick={() => {
                    shopify.modal.show("create-product-modal");
                }}>Create a New Product</button>
            </ui-title-bar>

            <ui-modal id="create-product-modal">
                <ui-title-bar title="Create a New Product">
                    <button variant="primary">Create</button>
                </ui-title-bar>
                <Box padding="400">
                    <Text as="h2">This is where you create a new product</Text>
                </Box>
            </ui-modal>

            <Layout>
                <Layout.Section>
                    <Card>
                        <Button onClick={() => {
                            shopify.toast.show("Button clicked");
                        }}>HeLLo</Button>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}