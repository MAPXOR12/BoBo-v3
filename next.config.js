if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `/varcel/path0/node_modules/canvas/build/Release:`,
  )
) {
  process.env.LD_LIBRARY_PATH = `/varcel/path0/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
}
