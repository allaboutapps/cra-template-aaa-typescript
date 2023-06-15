import { german } from "./de";
import { MessageIDS, setLocale, t } from "./util";

describe("t", () => {
    it("can infer placeholders from different ids", () => {
        setLocale("de");

        // no placeholder - does not require any values
        const t0 = t("common.logout");
        expect(t0).toEqual(german["common.logout"]);

        // it allows us to add any kind of values in case something was inferred incorrectly
        const t1 = t("common.logout", { foo: "foo" });
        expect(t1).toEqual(german["common.logout"]);

        // one placeholder
        const t2 = t("common.uptime", { uptime: "{uptime}" });
        expect(t2).toEqual(german["common.uptime"]);

        // it allows us to add any kind of values in case something was inferred incorrectly
        const t3 = t("common.uptime", { uptime: "{uptime}", foo: "foo" });
        expect(t3).toEqual(german["common.uptime"]);

        // multiple placeholders
        const t4 = t("test.twoParams", {
            param1: "{param1}",
            param2: "{param2}",
        });
        expect(t4).toEqual(german["test.twoParams"]);

        // it allows us to add any kind of values in case something was inferred incorrectly
        const t5 = t("test.twoParams", { param1: "{param1}", param2: "{param2}", foo: "foo" });
        expect(t5).toEqual(german["test.twoParams"]);

        // @ts-expect-error should show an error because of missing placeholder values
        t("common.uptime");

        // @ts-expect-error should show an error because of wrong placeholder values
        t("common.uptime", { hansi: "hansi" });

        // @ts-expect-error should show an error because of too few placeholder values
        t("test.twoParams", { param1: "{param1}" });
    });

    it("cannot infer placeholders from variables", () => {
        // Why so complicated? Randomness makes sure the compiler doesn't infer the type of the variable.
        // E.g. writing const id = "common.uptime" would infer the type of id as "common.uptime" which is part of MessageIDs and not string.
        const id = "common.uptime";
        const id2 = "language.german";
        const id3 = "test.twoParams";
        let result = id;
        for (let i = 0; i < 10; i++) {
            const which = Math.random() > 0.7 ? id3 : Math.random() > 0.5 ? id2 : id;
            result = which;
        }

        // using a variable with `IMessageIDS` as type cannot be inferred, hence no or all kind of values are allowed.
        const msg = result as MessageIDS;
        t(msg);
        t(msg, {});
        t(msg, { foo: "foo", bar: "bar" });
    });
});
