import { spawn } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Compilation, Compiler } from '@rspack/core';
import { logger } from 'rslog';

// declare type BiomeRspackPluginOption = {};
const BIOME_PLUGIN = 'BiomeRspackPlugin';

class BiomeRspackPlugin {
  // private readonly options: BiomeRspackPluginOption;
  defaultCheckArgs: string[];

  constructor() {
    // this.options = options;
    this.defaultCheckArgs = ['check'];
  }

  apply(compiler: Compiler) {
    compiler.hooks.afterEmit.tapAsync(
      BIOME_PLUGIN,
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (compilation: Compilation, callback: any) => {
        const isDevServer = process.argv.some(
          (v) => v.includes('serve') || v.includes('dev'),
        );

        if (!isDevServer) return callback(); // Only run in development mode

        const biomeCmd = this.resolveBiomeCmd();
        if (!biomeCmd) {
          logger.error(
            `[${BIOME_PLUGIN}] Biome is not installed or not found in the system.`,
          );
          return callback();
        }

        // Run Biome linting
        this.runBiomeLint(compilation, callback);
      },
    );
  }

  // Resolve Biome binary path or command to run
  private resolveBiomeCmd(): string | null {
    try {
      // Try to resolve Biome path from node_modules
      const biomePath = path.resolve('node_modules', '.bin', 'biome');

      if (fs.existsSync(biomePath)) {
        return biomePath;
        // biome-ignore lint/style/noUselessElse: <explanation>
      } else {
        logger.error(
          `[${BIOME_PLUGIN}]  Biome binary not found in node_modules.`,
        );
        return null;
      }
    } catch (error) {
      logger.error(`[${BIOME_PLUGIN}] Error resolving Biome:`, error);
      return null;
    }
  }

  // Run Biome using child_process spawn and collect lint errors
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private runBiomeLint(compilation: Compilation, callback: any) {
    const biomeCmd = this.resolveBiomeCmd();
    const args = [...this.defaultCheckArgs, '--colors=force'];

    const biomeProcess = spawn(
      `${
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        biomeCmd!
      }`,
      args,
      {
        shell: true,
      },
    );

    biomeProcess.stdout.on('data', (data) => {
      process.stdout.write(data);
    });

    biomeProcess.stderr.on('data', (data) => {
      process.stdout.write(`${data}`);
    });

    biomeProcess.on('close', (code) => {
      if (code !== 0) {
        compilation.errors.push(
          new Error(
            `[${BIOME_PLUGIN}] Linting process exited with code ${code}`,
          ),
        );
      }
      callback();
    });
  }
}

export { BiomeRspackPlugin };
