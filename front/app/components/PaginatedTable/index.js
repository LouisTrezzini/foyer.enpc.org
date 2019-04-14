/**
 *
 * PaginatedTable
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { Pagination, Table } from 'semantic-ui-react';

/* eslint-disable react/prefer-stateless-function */
class PaginatedTable extends React.Component {
  handlePaginationChange = (event, data) => {
    const { fetchRows } = this.props;

    if (!fetchRows) {
      return;
    }
    const { activePage } = data;
    fetchRows(activePage);
  };

  render() {
    const { rows, renderHeader, renderRow } = this.props;

    return (
      <Table celled>
        <Table.Header>{renderHeader()}</Table.Header>

        <Table.Body>{rows.map(row => renderRow(row))}</Table.Body>

        {this.renderFooter()}
      </Table>
    );
  }

  renderFooter() {
    const { paginationInfos } = this.props;

    if (!paginationInfos) {
      return null;
    }

    const { fetchRows } = this.props;
    const {
      current_page: activePage,
      total_pages: totalPages,
    } = paginationInfos;

    return (
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="5">
            <Pagination
              floated="right"
              disabled={!fetchRows}
              activePage={activePage}
              onPageChange={this.handlePaginationChange}
              totalPages={totalPages}
              prevItem={null}
              nextItem={null}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    );
  }
}

PaginatedTable.propTypes = {
  rows: PropTypes.array.isRequired,
  renderHeader: PropTypes.func.isRequired,
  renderRow: PropTypes.func.isRequired,
  paginationInfos: PropTypes.object.isRequired,
  fetchRows: PropTypes.func,
};

export default PaginatedTable;
