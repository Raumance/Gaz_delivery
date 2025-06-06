function paginationView(items, totalItems, page, size) {
    const totalPages = Math.ceil(totalItems / size);

    return {
        items,
        totalItems,
        totalPages,
        currentPage: page,
        pageSize: size
    };
}

module.exports = { paginationView };