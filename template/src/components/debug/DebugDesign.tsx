import { AddOutlined } from "@mui/icons-material";
import { Button, Fab, Link } from "@mui/material";
import { DebugBox } from "./DebugBox";
import { Icon } from "../ui/Icon";

const RowDescription = (props: { children?: React.ReactNode }) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                color: "#999",
            }}
        >
            {props.children}
        </div>
    );
};

const RowItem = (props: { children: React.ReactNode }) => {
    return <div style={{ display: "flex", alignItems: "center" }}>{props.children}</div>;
};

const Grid = (props: { gridTemplateColumns: string; children: React.ReactNode }) => {
    return (
        <div style={{ display: "grid", gridTemplateColumns: props.gridTemplateColumns, gridGap: 10 }}>
            {props.children}
        </div>
    );
};

const RowHeader = RowDescription;

const Buttons = () => {
    const gridTemplateColumns = "1fr 1fr 1fr 1fr";

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 600 }}>
            <h2 style={{ marginBottom: 24 }}>Buttons</h2>
            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowHeader></RowHeader>
                <RowHeader>Default</RowHeader>
                <RowHeader>Disabled</RowHeader>
                <RowHeader>Code</RowHeader>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowDescription>Primary</RowDescription>
                <RowItem>
                    <Button variant="contained">Title</Button>
                </RowItem>
                <RowItem>
                    <Button variant="contained" disabled>
                        Title
                    </Button>
                </RowItem>
                <RowItem>
                    <code>{'<Button variant="contained">'}</code>
                </RowItem>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowDescription>Primary with Icon</RowDescription>
                <RowItem>
                    <Button variant="contained" startIcon={<Icon name="close" useCurrentColor />}>
                        Title
                    </Button>
                </RowItem>
                <RowItem>
                    <Button variant="contained" startIcon={<Icon name="close" useCurrentColor />} disabled>
                        Title
                    </Button>
                </RowItem>
                <RowItem>
                    <code>{'<Button variant="contained" startIcon={<Icon name="close" useCurrentColor />}>'}</code>
                </RowItem>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowDescription>Secondary</RowDescription>
                <RowItem>
                    <Button variant="contained" color="secondary">
                        Title
                    </Button>
                </RowItem>
                <RowItem>
                    <Button variant="contained" color="secondary" disabled>
                        Title
                    </Button>
                </RowItem>
                <RowItem>
                    <code>{'<Button variant="contained" color="secondary">'}</code>
                </RowItem>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowDescription>Secondary with Icon</RowDescription>
                <RowItem>
                    <Button variant="contained" color="secondary" startIcon={<Icon name="close" useCurrentColor />}>
                        Title
                    </Button>
                </RowItem>
                <RowItem>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<Icon name="close" useCurrentColor />}
                        disabled
                    >
                        Title
                    </Button>
                </RowItem>
                <RowItem>
                    <code>
                        {
                            '<Button variant="contained" color="secondary" startIcon={<Icon name="close" useCurrentColor />}>'
                        }
                    </code>
                </RowItem>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowDescription>Tertiary</RowDescription>
                <RowItem>
                    <Button variant="contained" size="small" endIcon={<Icon name="close" useCurrentColor size={12} />}>
                        Title
                    </Button>
                </RowItem>
                <RowItem>
                    <Button
                        variant="contained"
                        size="small"
                        endIcon={<Icon name="close" useCurrentColor size={12} />}
                        disabled
                    >
                        Title
                    </Button>
                </RowItem>
                <RowItem>
                    <code>
                        {
                            '<Button variant="contained" size="small" endIcon={<Icon name="chevronRight" useCurrentColor size={12} />}>'
                        }
                    </code>
                </RowItem>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowDescription>Flat</RowDescription>
                <RowItem>
                    <Button variant="text">Title</Button>
                </RowItem>
                <RowItem>
                    <Button variant="text" disabled>
                        Title
                    </Button>
                </RowItem>
                <RowItem>
                    <code>{'<Button variant="text">'}</code>
                </RowItem>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowDescription>Flat with Icon</RowDescription>
                <RowItem>
                    <Button variant="text" endIcon={<Icon name="close" useCurrentColor size={12} />}>
                        Title
                    </Button>
                </RowItem>
                <RowItem>
                    <Button variant="text" endIcon={<Icon name="close" useCurrentColor size={12} />} disabled>
                        Title
                    </Button>
                </RowItem>
                <RowItem>
                    <code>
                        {'<Button variant="text" endIcon={<Icon name="chevronRight" useCurrentColor size={12} />}>'}
                    </code>
                </RowItem>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowDescription>Textlink</RowDescription>
                <RowItem>
                    <Link href="/">Title</Link>
                </RowItem>
                <RowItem>
                    <Link href="/" className="disabled">
                        {" "}
                        Title{" "}
                    </Link>
                </RowItem>
                <RowItem>
                    <code>{'<Link href="/">'}</code>
                </RowItem>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowDescription>Floating Action Small</RowDescription>
                <RowItem>
                    <Fab size="small">
                        <AddOutlined />
                    </Fab>
                </RowItem>
                <RowItem>
                    <Fab size="small" disabled>
                        <AddOutlined />
                    </Fab>
                </RowItem>
                <RowItem>
                    <code>{'<Fab size="small">'}</code>
                </RowItem>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowDescription>Floating Action Small</RowDescription>
                <RowItem>
                    <Fab>
                        <AddOutlined />
                    </Fab>
                </RowItem>
                <RowItem>
                    <Fab disabled>
                        <AddOutlined />
                    </Fab>
                </RowItem>
                <RowItem>
                    <code>{"<Fab>"}</code>
                </RowItem>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowDescription>Floating Action Small</RowDescription>
                <RowItem>
                    <Fab variant="extended">
                        <AddOutlined /> Title
                    </Fab>
                </RowItem>
                <RowItem>
                    <Fab variant="extended" disabled>
                        <AddOutlined /> Title
                    </Fab>
                </RowItem>
                <RowItem>
                    <code>{'<Fab variant="extended">'}</code>
                </RowItem>
            </Grid>
        </div>
    );
};

const TextStyles = () => {
    const gridTemplateColumns = "1fr 1fr";

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h2 style={{ marginBottom: 24 }}>Text Styles</h2>
            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowHeader>Style</RowHeader>
                <RowHeader>Code</RowHeader>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowItem>
                    <h1>Headline 1</h1>
                </RowItem>
                <RowItem>
                    <code>{"<h1>, .h1"}</code>
                </RowItem>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowItem>
                    <h2>Headline 2</h2>
                </RowItem>
                <RowItem>
                    <code>{"<h2>, .h2"}</code>
                </RowItem>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowItem>
                    <h3>Headline 3</h3>
                </RowItem>
                <RowItem>
                    <code>{"<h3>, .h3"}</code>
                </RowItem>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowItem>
                    <h4>Headline 4</h4>
                </RowItem>
                <RowItem>
                    <code>{"<h4>, .h4"}</code>
                </RowItem>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowItem>
                    <h5>Overline</h5>
                </RowItem>
                <RowItem>
                    <code>{"<h5>, .overline"}</code>
                </RowItem>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowItem>
                    <p>Body M Regular</p>
                </RowItem>
                <RowItem>
                    <code>{"<p>, .bodyM"}</code>
                </RowItem>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowItem>
                    <p className="bodyS">Body S Regular</p>
                </RowItem>
                <RowItem>
                    <code>{'<p className="bodyS">, .bodyS'}</code>
                </RowItem>
            </Grid>

            <Grid gridTemplateColumns={gridTemplateColumns}>
                <RowItem>
                    <p className="bodyCaption">Body Caption</p>
                </RowItem>
                <RowItem>
                    <code>{'<p className="bodyCaption">, .bodyCaption'}</code>
                </RowItem>
            </Grid>
        </div>
    );
};

export const DebugDesign = () => {
    return (
        <>
            <DebugBox>
                <Buttons />
            </DebugBox>
            <DebugBox>
                <TextStyles />
            </DebugBox>
        </>
    );
};
