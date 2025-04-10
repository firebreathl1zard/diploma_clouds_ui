import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

function ConsolePages() {
    const terminalRef = useRef(null);
    const fitAddon = new FitAddon();
    const inputBuffer = useRef("");

    useEffect(() => {
        const terminal = new Terminal();
        terminal.loadAddon(fitAddon);
        terminal.open(terminalRef.current);
        fitAddon.fit();

        terminal.writeln("Welcome!");

        terminal.onData(data => {
            if (data === '\u0008' || data === '\u007F') { 
                if (inputBuffer.current.length > 0) {
                    inputBuffer.current = inputBuffer.current.slice(0, -1);
                    terminal.write('\b \b');
                }
            } else if (data === '\r') {
                terminal.writeln(` You typed: ${inputBuffer.current}`);
                inputBuffer.current = "";
            } else {
                inputBuffer.current += data;
                terminal.write(data);
            }
        });

        window.addEventListener('resize', () => {
            fitAddon.fit();
        });

        return () => {
            window.removeEventListener('resize', () => {
                fitAddon.fit();
            });
            terminal.dispose();
        };
    }, []);

    return (
        <div ref={terminalRef} style={{ width: "100%", height: "100vh" }} />
    );
}

export default ConsolePages;