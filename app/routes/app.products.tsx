import{ Page, Layout, Card, Text, Button } from "@shopify/polaris";

export default function Products() {
    return (
        <Page>
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